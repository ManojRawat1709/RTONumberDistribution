using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RTONumberDistribution.Services;
using System.Collections.Generic;

namespace RTONumberDistribution.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NumberGeneratorController : ControllerBase
    {
        private readonly ILogger<NumberGeneratorController> _logger;
        private readonly INumberGeneratorService _service;

        public NumberGeneratorController(ILogger<NumberGeneratorController> logger, INumberGeneratorService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public IEnumerable<string> Get(int firstNumber, int lastNumber, int favNumber)
        {
            IEnumerable<string> listNumbers = _service.GenerateNumber(firstNumber, lastNumber, favNumber);
            return listNumbers;
        }
    }
}
