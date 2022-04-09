#include <stdio.h>

int add(int a, int b)
{
  return a + b;
}

int main()
{
  int i = 2; 
  printf("%d\n", 3 << i);
  printf("%d\n", i);
  printf("%d\n", i << 3);
  printf("%d\n", 8 >> 1);
  return 0;
}