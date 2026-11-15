#include "hype.hpp"
#include <fstream>
#include <iostream>
#include <stdexcept>
#include <chrono>
void check(bool condition){if(!condition)throw std::runtime_error("test assertion failed");}
int main(){using namespace hype;try{
 Core core;check(core.start(false)==Result::unsupported);core.stop();check(core.start(true)==Result::ok);check(core.start(true)==Result::conflict);core.input(1,false);check(core.focus()==1);core.input(1,true);core.input(99,false);check(core.focus()==1);check(core.suspend()==Result::ok);check(core.resume()==Result::ok);core.stop();check(core.state()==State::stopped);
 const auto root=std::filesystem::temp_directory_path()/("hype-test-"+std::to_string(std::chrono::steady_clock::now().time_since_epoch().count()));Files files(root);std::string out;
 check(files.write("../escape.txt","bad",true)==Result::denied);check(files.write("C:\\escape.txt","bad",true)==Result::denied);check(files.write("CON.txt","bad",true)==Result::denied);check(files.write("a.txt",std::string(1024*1024+1,'x'),true)==Result::too_large);
 check(files.save("note.sav","original",false)==Result::ok);check(files.save("note.sav","replace",false)==Result::conflict);check(files.load("note.sav",out)==Result::ok&&out=="original");
 {std::ofstream(root/"note.sav.staging")<<"interrupted";}check(files.save("note.sav","new",true)==Result::conflict);check(files.load("note.sav",out)==Result::ok&&out=="original");std::filesystem::remove(root/"note.sav.staging");
 check(files.write("note.sav","corrupt",true)==Result::ok);check(files.load("note.sav",out)==Result::corrupt);check(files.remove("note.sav",false)==Result::denied);
 Extension sample{"sample",1,{"app.info"},true};check(validate_extension(sample)==Result::ok);check(!permitted(sample,"app.log"));sample.sdk=2;check(validate_extension(sample)==Result::unsupported);sample.sdk=1;sample.bundled=false;check(validate_extension(sample)==Result::denied);
 Diagnostics d;for(int i=0;i<220;i++)d.record("secret=abc");check(d.size()==200);check(d.export_text().find("secret")==std::string::npos);check(theme("invalid").background=="#09090B");check(online_available({false,true})==Result::unsupported);
 std::vector<CatalogRecord> catalog;check(parse_catalog(R"({"schemaVersion":1,"records":[{"firmware":"9.00","status":"reference_listed","evidenceIds":[]}]})",catalog)==Result::ok);check(catalog.size()==1);
 check(parse_catalog("{broken",catalog)==Result::invalid);check(catalog.size()==1);check(parse_catalog(std::string(65537,'x'),catalog)==Result::too_large);check(parse_catalog(R"({"schemaVersion":2,"records":[]})",catalog)==Result::unsupported);
 check(parse_catalog(R"({"schemaVersion":1,"records":[{"firmware":"9.00","status":"verified","evidenceIds":[]}]})",catalog)==Result::invalid);
 check(parse_catalog(std::string("{\"schemaVersion\":1,\"records\":[],\"bad\":\"")+static_cast<char>(0xff)+"\"}",catalog)==Result::invalid);
 Settings settings;settings.locale="id";check(files.write("settings.json",serialize_settings(settings),false)==Result::ok);check(files.read("settings.json",out)==Result::ok);Settings restored;check(parse_settings(out,restored)==Result::ok&&restored.locale=="id");check(parse_settings("{}",restored)==Result::invalid&&restored.locale=="id");
 std::filesystem::remove_all(root);std::cout<<"PASS portable lifecycle, input, path bounds, overwrite, interrupted save, corruption, extension, diagnostics, TLS capability, JSON metadata, UTF-8, settings persistence\n";return 0;
 }catch(const std::exception& e){std::cerr<<e.what()<<'\n';return 1;}}
