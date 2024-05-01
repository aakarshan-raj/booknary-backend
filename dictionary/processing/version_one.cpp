/*

author: Aakarshan Raj
Made to get a json in, in memory in map

*/


#include <iostream>
#include <fstream>
#include <map>

using namespace std;

class Dictionary
{
private:
  std::map<string, string> json_dictionary;
  ifstream file;

public:
  Dictionary(std::string filename)
  {
    file.open(filename);
  }

  void read_in_memory()
  {
    string line;

    while (std::getline(file, line))
    {

      int i = line.length();
      string key, value;

      int stage = 0;

      for (int j = 0; j < i; j++) // Prcoess one line
      {

        if (line[j] == '"' && (stage == 0))
        {
          stage = 1;
          continue;
        }

        if (line[j] == '"' && (stage == 1))
        {
          stage = 2;
          continue;
        }

        if (line[j] == '"' && (stage == 2))
        {
          stage = 3;
          continue;
        }
        if (line[j] == '"' && (stage == 3))
        {
          if (line[j + 1] != ',' && (j != i - 1))      // for last line without any , forward
          {
            value.push_back('"');                      // for values that have '"' in them
            continue;
          }
          stage = 4;
          break;
        }
        if (stage == 1)
        {
          key.push_back(line[j]);
        }
        if (stage == 3)
        {
          value.push_back(line[j]);
        }
      }
      if (key != "")
        json_dictionary[key] = value;
    }
  }

  void print_dictionary()
  {
    for (const auto &x : json_dictionary)
    {
      cout << x.first << ":" << x.second << endl;
      cout << endl;
    }
  }

  std::string get_meaning(std::string word)
  {
    return json_dictionary[word];
  }
};

int main()
{

  Dictionary d1("dictionary.json");
  d1.read_in_memory();
  cout<<d1.get_meaning("nice")<<std::endl;
}
