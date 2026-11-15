#include "hype.hpp"
#include <iostream>
int main(){hype::Extension extension{"hypekit.info",1,{"app.info"},true};if(!hype::permitted(extension,"app.info"))return 1;std::cout<<"HYPEKIT SDK 1 | Native "<<hype::version<<'\n';return 0;}
