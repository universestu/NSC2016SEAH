#include <iostream>
#include <fstream>
#include <string>
#include <cstdlib>
#include <ctime>
 #include <unistd.h>
using namespace std;

int main()
{ 

	 int ranx;
	ofstream dest("data.json");
	srand(time(0));
	ranx = rand()% 100 + 400;
	dest << "{\"value1\":" << ranx <<"}";
	cout << ranx <<endl;
	usleep( 500 * 1000 );
	dest.close();
	

	
	return 0;
}
