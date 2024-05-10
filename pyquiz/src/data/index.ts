export interface Question {
  id: number;
  Task: {
    Head: string;
    Conditions: string[];
  };
  Example: {
    Input: string[];
    Output: string[];
  };
  InputFormat: string[];
  OutputFormat: string[];
  Constraints: string[];
  AnotherExample: {
    SampleInput: string[];
    SampleOutput: string[];
  };
}

export const questions: Question[] = [
  {
    id: 1,
    Task: {
      Head: "The provided code stub reads two integers from STDIN. a and b . Add code to print three lines where:",
      Conditions: [
        " The first line contains the sum of the two numbers. ",
        " The second line contains the difference of the two numbers (first - second). ",
        " The third line contains the product of the two numbers. ",
      ],
    },
    Example: {
      Input: ["a = 10;", "b = 20;"],
      Output: ["8", "-2", "15"],
    },
    InputFormat: [
      "1) The first line contains the first integer, a.",
      "2) The second line contains the second integer, b.",
    ],
    OutputFormat: ["print the three line as explained above"],
    Constraints: ["1≤a≤10^10", "1≤b≤10^10"],
    AnotherExample: {
      SampleInput: ["3", "2"],
      SampleOutput: ["5", "1", "7"],
    },
  },

  {
    id: 2,
    Task: {
      Head: "You are given two integers, N and M. Write a program to perform the following operations:",
      Conditions: [
        "Calculate the sum of the first N natural numbers raised to the power of M.",
        "Calculate the product of the first M prime numbers.",
        "Calculate the difference between the sum of the squares of the first N odd numbers and the sum of the squares of the first M even numbers.",
      ],
    },
    Example: {
      Input: ["N = 3;", "M = 2;"],
      Output: ["Sum: 36", "Product: 15", "Difference: 47"],
    },
    InputFormat: [
      "The first line contains an integer N (1 ≤ N ≤ 1000), representing the number of natural numbers.",
      "The second line contains an integer M (1 ≤ M ≤ 1000), representing the number of prime numbers.",
    ],
    OutputFormat: [
      "Print three lines:",
      "The first line should contain the sum of the first N natural numbers raised to the power of M.",
      "The second line should contain the product of the first M prime numbers.",
      "The third line should contain the difference between the sum of the squares of the first N odd numbers and the sum of the squares of the first M even numbers.",
    ],
    Constraints: ["1 ≤ N ≤ 1000", "1 ≤ M ≤ 1000"],
    AnotherExample: {
      SampleInput: ["4", "3"],
      SampleOutput: ["Sum: 1900", "Product: 30", "Difference: 337"],
    },
  },
];
