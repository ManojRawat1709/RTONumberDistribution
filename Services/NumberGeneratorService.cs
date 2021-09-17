using System.Collections.Generic;

namespace RTONumberDistribution.Services
{
    public class NumberGeneratorService : INumberGeneratorService
    {
        public List<string> GenerateNumber(int firstNumber, int lastNumber, int favNumber)
        {
            List<string> listOfFavNumber = new List<string>();
            for (int i = firstNumber; i <= lastNumber; i++)
            {
                int number = i;
                int sum = 0;
                int newNumber = 0;
                bool isfavNumberConsist = false;
                while (number > 0)
                {
                    newNumber = number % 10;
                    sum = sum + newNumber;
                    number = number / 10;
                    if (newNumber == favNumber)
                    {
                        isfavNumberConsist = true;
                    }
                    if (isfavNumberConsist && number == 0 && sum > 9)
                    {
                        number = sum;
                        sum = 0;
                    }
                }
                if (isfavNumberConsist && sum == favNumber)
                    listOfFavNumber.Add("DL 3C AF "+ i.ToString().PadLeft(4,'0'));
            }
            return listOfFavNumber;
        }
    }
}
