#include "vector.h"
#include <vector>
#include <algorithm>
#include <iostream>
using namespace std;

template <typename T>
class print{
    public: 
        void operator()(const T& elem) {
            cout<< elem << "cc" << ' ';
        }
};


int main() {
    int ia[6] = { 0,1,2,3,4,5 };
    cout << ia << endl;
    vector<int> iv(ia, ia+6);

    for_each(iv.begin(), iv.end(), print<int>());
    cout << endl;
    string res = VV::func1();
    cout << res << endl;
    return 0;
}