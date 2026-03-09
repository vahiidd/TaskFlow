using System.Net;
using System.Net.Http.Json;
using FluentAssertions;

public class AuthEndpointsTests : IClassFixture<CustomWebAppFactory>
{
    private readonly HttpClient _client;

    public AuthEndpointsTests(CustomWebAppFactory factory)
        => _client = factory.CreateClient();

    [Fact]
    public async Task Register_Then_Login_Returns_Token()
    {
        var reg = await _client.PostAsJsonAsync("/api/auth/register", new {
            email = "test@test.com", fullName = "Tester", password = "Passw0rd!"
        });
        reg.StatusCode.Should().Be(HttpStatusCode.OK);

        var login = await _client.PostAsJsonAsync("/api/auth/login", new {
            email = "test@test.com", password = "Passw0rd!"
        });
        login.StatusCode.Should().Be(HttpStatusCode.OK);

        var body = await login.Content.ReadFromJsonAsync<LoginResponse>();
        body!.Token.Should().NotBeNullOrWhiteSpace();
    }

    private record LoginResponse(int UserId, string Email, string FullName, string Token);
}
