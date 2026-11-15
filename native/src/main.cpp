#include "hype.hpp"
#include <iostream>
int main(int argc,char** argv){
 try {hype::Core core;hype::Diagnostics logs;hype::Files files(argc>1?argv[1]:"hypehen-app-data");
 if(core.start(true)!=hype::Result::ok)return 1;
 std::cout<<"HYPEHEN Native "<<hype::version<<" | MR.4NONY / NEXORAID\nPortable user-space app. PS4 runtime not verified.\n";
 std::string command;
 while(std::cout<<"Commands: files, save, load, settings, library, diagnostics, extension, exit\n> " && std::getline(std::cin,command)){
 if(command=="exit")break;
 if(command=="files"){for(const auto& name:files.list())std::cout<<name<<'\n';}
 else if(command=="save"){std::string text,confirm;std::cout<<"Own-app note: ";std::getline(std::cin,text);std::cout<<"Confirm overwrite (yes): ";std::getline(std::cin,confirm);const auto r=files.save("note.sav",text,confirm=="yes");std::cout<<"Result "<<static_cast<int>(r)<<" (0 = completed)\n";}
 else if(command=="load"){std::string text;const auto r=files.load("note.sav",text);if(r==hype::Result::ok)std::cout<<text<<'\n';else std::cout<<"Read failed: "<<static_cast<int>(r)<<'\n';}
 else if(command=="settings"){hype::Settings settings;std::string raw; if(files.read("settings.json",raw)==hype::Result::ok)hype::parse_settings(raw,settings);std::cout<<"Language / Bahasa (en/id): ";std::getline(std::cin,settings.locale);std::cout<<"Theme / Tema (default/high-contrast): ";std::getline(std::cin,settings.theme_name);hype::Settings validated;const auto serialized=hype::serialize_settings(settings);if(hype::parse_settings(serialized,validated)!=hype::Result::ok)std::cout<<"Invalid / Tidak valid\n";else std::cout<<"Result "<<static_cast<int>(files.write("settings.json",serialized,true))<<'\n';}
 else if(command=="library"){std::string raw;const auto read=files.read("catalog.json",raw);std::vector<hype::CatalogRecord> records;const auto parsed=read==hype::Result::ok?hype::parse_catalog(raw,records):read;if(parsed!=hype::Result::ok)std::cout<<"Catalog unavailable / Katalog tidak tersedia: "<<static_cast<int>(parsed)<<'\n';else for(const auto& record:records)std::cout<<record.firmware<<" | "<<record.status<<'\n';}
 else if(command=="diagnostics"){std::cout<<logs.export_text();std::string confirm;std::cout<<"Export app report (yes) / Ekspor laporan aplikasi (yes): ";std::getline(std::cin,confirm);if(confirm=="yes")std::cout<<"Result "<<static_cast<int>(files.write("diagnostics.txt",logs.export_text(),true))<<'\n';}
 else if(command=="extension"){hype::Extension sample{"hypekit.info",1,{"app.info"},true};if(hype::permitted(sample,"app.info"))std::cout<<"Bundled HYPEKIT information extension: "<<hype::version<<'\n';}
 else {logs.record("HX-5002");std::cout<<"Unknown command\n";}}
 core.stop();return 0;
 }catch(const std::exception&){std::cerr<<"App storage unavailable; no system files changed.\n";return 1;}
}
