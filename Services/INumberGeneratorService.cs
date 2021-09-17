using System.Collections.Generic;

namespace RTONumberDistribution.Services
{
    public interface INumberGeneratorService
    {
        List<string> GenerateNumber(int firstNumber, int lastNumber, int favNumber);
    }
}
