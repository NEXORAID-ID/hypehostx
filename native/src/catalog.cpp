#include "hype.hpp"
#include <nlohmann/json.hpp>
#include <regex>
#include <set>
namespace hype {
using json=nlohmann::json;
static json parse_bounded(const std::string& input){
 if(input.size()>65536)throw std::runtime_error("oversized");
 return json::parse(input,[](int depth,json::parse_event_t,json&){if(depth>16)throw std::runtime_error("depth");return true;});
}
Result parse_catalog(const std::string& input,std::vector<CatalogRecord>& output){
 if(input.size()>65536)return Result::too_large;
 try{const auto data=parse_bounded(input);if(!data.is_object()||data.value("schemaVersion",0)!=1)return Result::unsupported;
 const auto& rows=data.at("records");if(!rows.is_array()||rows.size()>256)return Result::invalid;
 std::set<std::string> seen;std::vector<CatalogRecord> parsed;
 for(const auto& row:rows){const auto fw=row.at("firmware").get<std::string>(),status=row.at("status").get<std::string>();
 if(!std::regex_match(fw,std::regex("([1-9]|[1-9][0-9])\\.[0-9]{2}"))||!seen.insert(fw).second)return Result::invalid;
 if(status!="reference_listed"&&status!="under_review"&&status!="verified"&&status!="failed"&&status!="withdrawn"&&status!="unsupported")return Result::invalid;
 if(!row.at("evidenceIds").is_array())return Result::invalid;
 if(status=="verified"&&(row.at("evidenceIds").empty()||row.value("reviewer",std::string()).empty()||row.value("reviewedAt",std::string()).empty()))return Result::invalid;
 parsed.push_back({fw,status});}
 output=std::move(parsed);return Result::ok;
 }catch(const std::exception&){return Result::invalid;}
}
Result parse_settings(const std::string& input,Settings& output){
 try{const auto data=parse_bounded(input);if(!data.is_object()||data.size()!=4||data.value("schemaVersion",0)!=1)return Result::invalid;
 Settings next;next.locale=data.at("locale").get<std::string>();next.theme_name=data.at("theme").get<std::string>();next.diagnostics=data.at("diagnostics").get<bool>();
 if((next.locale!="en"&&next.locale!="id")||(next.theme_name!="default"&&next.theme_name!="high-contrast"))return Result::invalid;output=next;return Result::ok;
 }catch(const std::exception&){return Result::invalid;}
}
std::string serialize_settings(const Settings& settings){return json({{"schemaVersion",1},{"locale",settings.locale},{"theme",settings.theme_name},{"diagnostics",settings.diagnostics}}).dump();}
}
