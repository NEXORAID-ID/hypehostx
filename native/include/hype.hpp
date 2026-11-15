#pragma once
#include <cstdint>
#include <filesystem>
#include <string>
#include <vector>
namespace hype {
inline constexpr const char* version = "0.1.0-dev";
enum class State { uninitialized, starting, ready, suspended, stopping, stopped, error };
enum class Result { ok, invalid, denied, unsupported, conflict, corrupt, io_error, too_large };
class Core {
 State state_ = State::uninitialized;
 std::size_t focus_ = 0;
public:
 Result start(bool adapter_available);
 Result suspend(); Result resume(); void stop();
 State state() const {return state_;}
 std::size_t focus() const {return focus_;}
 void input(int direction, bool repeated);
};
class Diagnostics {
 std::vector<std::string> codes_;
public:
 void record(const std::string& code);
 std::string export_text() const;
 void clear() {codes_.clear();}
 std::size_t size() const {return codes_.size();}
};
class Files {
 std::filesystem::path root_;
 bool valid(const std::string& name) const;
public:
 explicit Files(std::filesystem::path root);
 Result write(const std::string& name, const std::string& content, bool overwrite);
 Result read(const std::string& name, std::string& output) const;
 Result remove(const std::string& name, bool confirmed);
 std::vector<std::string> list() const;
 Result save(const std::string& name, const std::string& content, bool overwrite);
 Result load(const std::string& name, std::string& output) const;
};
struct Extension {std::string id; int sdk; std::vector<std::string> permissions; bool bundled;};
Result validate_extension(const Extension& extension);
bool permitted(const Extension& extension, const std::string& permission);
struct Theme {std::string background="#09090B", foreground="#F5F5F5", accent="#B91C35";};
Theme theme(const std::string& name);
struct NetworkCapabilities {bool tls=false; bool secure_storage=false;};
Result online_available(NetworkCapabilities capabilities);
struct CatalogRecord {std::string firmware; std::string status;};
Result parse_catalog(const std::string& input,std::vector<CatalogRecord>& output);
struct Settings {std::string locale="en";std::string theme_name="default";bool diagnostics=false;};
Result parse_settings(const std::string& input,Settings& output);
std::string serialize_settings(const Settings& settings);
}
