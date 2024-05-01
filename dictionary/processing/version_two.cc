/*
author: aakarshan raj
Made for creating JSON files out of txt dictionary
*/


#include <iostream>
#include <map>
#include <fstream>

using namespace std;

void separateBySpace(std::string);
void dataDump();

std::map<string, string> dictionary;

int main()
{

    ifstream file("dictionary.txt");
    std::string line;
    while (std::getline(file, line))
    {
        if (line == "")
        {
            continue;
        }

        separateBySpace(line);
    }

    for (const auto &x : dictionary)
    {
        cout << x.first << x.second << endl;
    }
    dataDump();
}

void separateBySpace(std::string line)
{
    int key_end = -1;
    int value_start = 0;
    for (int i = 0; i < line.length(); i++)
    {
        if (line[i] == ' ')
        {
            key_end = i;
        }
        if (key_end != -1)
        {
            if (line[i] != ' ')
            {
                value_start = i;
                break;
            }
        }
    }

    if (value_start == 0)
    {
    }
    else
    {
        dictionary[line.substr(0, key_end)] = line.substr(value_start, line.length() - 1);
    }
}

void dataDump()
{
    std::ofstream outFile("map_dump.json");
    outFile << "{\n";
    for (const auto &x : dictionary)
    {
        outFile << "\"" << x.first << "\""
                << ":"
                << "\"" << x.second << "\""
                << "," << endl;
    }
    outFile << "\n}";

    outFile.close();
}
