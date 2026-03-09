using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using FluentAssertions;

public class TasksEndpointsTests : IClassFixture<CustomWebAppFactory>
{
    private readonly HttpClient _client;

    public TasksEndpointsTests(CustomWebAppFactory factory)
        => _client = factory.CreateClient();

    private async Task<string> LoginTokenAsync()
    {
        await _client.PostAsJsonAsync("/api/auth/register",
            new { email = "a@b.com", fullName = "A", password = "Passw0rd!" });

        var res = await _client.PostAsJsonAsync("/api/auth/login",
            new { email = "a@b.com", password = "Passw0rd!" });

        var body = await res.Content.ReadFromJsonAsync<LoginResponse>();
        return body!.Token;
    }

    [Fact]
    public async Task Create_Then_List_Works()
    {
        var token = await LoginTokenAsync();
        _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var create = await _client.PostAsJsonAsync("/api/tasks", new {
            title = "Testaufgabe", description = "Desc", status = 0
        });
        create.StatusCode.Should().Be(HttpStatusCode.Created);

        var list = await _client.GetAsync("/api/tasks");
        list.StatusCode.Should().Be(HttpStatusCode.OK);

        var items = await list.Content.ReadFromJsonAsync<List<TaskDto>>();
        items!.Should().HaveCount(1);
        items[0].Title.Should().Be("Testaufgabe");
    }

    private record LoginResponse(int UserId, string Email, string FullName, string Token);
    private record TaskDto(int Id, string Title, string? Description, int Status, DateTime? DueDate, DateTime CreatedAt, DateTime? UpdatedAt);
}
