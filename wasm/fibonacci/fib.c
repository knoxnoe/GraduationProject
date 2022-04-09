#include <stdio.h>
#include <time.h>
clock_t start, end;
double duration;

int fib(int n) {
  if (n <= 1)
  {
    return 1;
  }
  return fib(n - 1) + fib(n - 2);
}

int main(int argc, char **argv)
{
  start = clock();
  fib(40);
  end = clock();
  duration = (double)(end - start) / CLOCKS_PER_SEC;
  printf("%lf", duration);
  return 0;
}
