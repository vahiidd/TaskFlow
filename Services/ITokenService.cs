using TaskFlowApi.Entities;

namespace TaskFlow.Api.Services;

public interface ITokenService
{
    string CreateToken(User user);
}