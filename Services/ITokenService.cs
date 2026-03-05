using TaskFlowApi.Entities;

namespace TaskFlowApi.Services;

public interface ITokenService
{
    string CreateToken(User user);
}