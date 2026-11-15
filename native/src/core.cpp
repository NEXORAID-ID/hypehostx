#include "hype.hpp"
#include <algorithm>
#include <fstream>
#include <regex>
#include <sstream>
#ifdef _WIN32
#define NOMINMAX
#include <windows.h>
#endif
namespace hype {
Result Core::start(bool available) {if(state_!=State::uninitialized && state_!=State::stopped)return Result::conflict;state_=State::starting;if(!available){state_=State::error;return Result::unsupported;}state_=State::ready;return Result::ok;}
Result Core::suspend(){if(state_!=State::ready)return Result::conflict;state_=State::suspended;return Result::ok;}
Result Core::resume(){if(state_!=State::suspended)return Result::conflict;state_=State::ready;return Result::ok;}
void Core::stop(){state_=State::stopping;focus_=0;state_=State::stopped;}
void Core::input(int direction,bool repeated){if(state_!=State::ready||repeated)return;if(direction==1)focus_=(focus_+1)%6;if(direction==-1)focus_=(focus_+5)%6;}
void Diagnostics::record(const std::string& code){codes_.push_back(std::regex_match(code,std::regex("HX-[0-9]{4}"))?code:"HX-5001");if(codes_.size()>200)codes_.erase(codes_.begin());}
std::string Diagnostics::export_text() const {std::string out="HYPEHEN Native "+std::string(version)+"\nPortable host; PS4 untested\n";for(const auto& code:codes_)out+=code+"\n";return out;}
Files::Files(std::filesystem::path root):root_(std::filesystem::absolute(std::move(root))){std::filesystem::create_directories(root_);if(std::filesystem::is_symlink(root_))throw std::runtime_error("App root must not be a symlink");root_=std::filesystem::canonical(root_);}
bool Files::valid(const std::string& name) const {
 if(!std::regex_match(name,std::regex("[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}\\.[a-zA-Z0-9]{1,8}")))return false;
 auto upper=name.substr(0,name.find('.'));std::transform(upper.begin(),upper.end(),upper.begin(),[](unsigned char c){return static_cast<char>(std::toupper(c));});
 if(std::regex_match(upper,std::regex("CON|PRN|AUX|NUL|COM[0-9]|LPT[0-9]")))return false;
 std::error_code ec;const auto stat=std::filesystem::symlink_status(root_/name,ec);
 return !std::filesystem::is_symlink(stat) && (!std::filesystem::exists(stat)||std::filesystem::is_regular_file(stat));
}
Result Files::write(const std::string& name,const std::string& content,bool overwrite){
 if(!valid(name))return Result::denied;if(content.size()>1024*1024)return Result::too_large;
 try {const auto dest=root_/name;if(std::filesystem::exists(dest)&&!overwrite)return Result::conflict;
 const auto temp=root_/(name+".staging");if(std::filesystem::exists(std::filesystem::symlink_status(temp)))return Result::conflict;
 {std::ofstream stream(temp,std::ios::binary|std::ios::trunc);if(!stream)return Result::io_error;stream.write(content.data(),static_cast<std::streamsize>(content.size()));stream.flush();if(!stream){stream.close();std::filesystem::remove(temp);return Result::io_error;}}
#ifdef _WIN32
 if(!MoveFileExW(temp.c_str(),dest.c_str(),MOVEFILE_REPLACE_EXISTING|MOVEFILE_WRITE_THROUGH)){std::filesystem::remove(temp);return Result::io_error;}
#else
 std::filesystem::rename(temp,dest);
#endif
 return Result::ok;}catch(const std::filesystem::filesystem_error&){return Result::io_error;}
}
Result Files::read(const std::string& name,std::string& output) const {if(!valid(name))return Result::denied;try{const auto path=root_/name;if(!std::filesystem::exists(path))return Result::io_error;if(std::filesystem::file_size(path)>1024*1024)return Result::too_large;std::ifstream stream(path,std::ios::binary);if(!stream)return Result::io_error;std::ostringstream bytes;bytes<<stream.rdbuf();if(stream.bad())return Result::io_error;output=bytes.str();return Result::ok;}catch(const std::filesystem::filesystem_error&){return Result::io_error;}}
Result Files::remove(const std::string& name,bool confirmed){if(!confirmed||!valid(name))return Result::denied;try{return std::filesystem::remove(root_/name)?Result::ok:Result::io_error;}catch(const std::filesystem::filesystem_error&){return Result::io_error;}}
std::vector<std::string> Files::list() const {std::vector<std::string> names;for(const auto& p:std::filesystem::directory_iterator(root_)){auto name=p.path().filename().string();if(valid(name))names.push_back(name);}std::sort(names.begin(),names.end());return names;}
static std::uint32_t checksum(const std::string& data){std::uint32_t crc=0xffffffffu;for(unsigned char b:data){crc^=b;for(int i=0;i<8;++i)crc=(crc>>1)^((crc&1)?0xedb88320u:0);}return ~crc;}
Result Files::save(const std::string& name,const std::string& content,bool overwrite){return write(name,"HXSV1\n"+std::to_string(checksum(content))+"\n"+content,overwrite);}
Result Files::load(const std::string& name,std::string& output) const {std::string raw;auto result=read(name,raw);if(result!=Result::ok)return result;if(raw.rfind("HXSV1\n",0)!=0)return Result::corrupt;const auto end=raw.find('\n',6);if(end==std::string::npos)return Result::corrupt;auto content=raw.substr(end+1);if(raw.substr(6,end-6)!=std::to_string(checksum(content)))return Result::corrupt;output=content;return Result::ok;}
Result validate_extension(const Extension& e){if(e.sdk!=1)return Result::unsupported;if(!e.bundled)return Result::denied;if(!std::regex_match(e.id,std::regex("[a-z][a-z0-9.-]{0,63}")))return Result::invalid;for(const auto& p:e.permissions)if(p!="app.info"&&p!="app.log")return Result::denied;return Result::ok;}
bool permitted(const Extension& e,const std::string& permission){return validate_extension(e)==Result::ok&&std::find(e.permissions.begin(),e.permissions.end(),permission)!=e.permissions.end();}
Theme theme(const std::string& name){Theme t;if(name=="high-contrast"){t.background="#000000";t.foreground="#FFFFFF";}return t;}
Result online_available(NetworkCapabilities caps){return caps.tls&&caps.secure_storage?Result::ok:Result::unsupported;}
}
