var originalData = "kibo007";
describe("gitHubService .get", function () {
    var gitHubService, httpBackend;

    beforeEach(module("gitHubModule"));

    beforeEach(inject(function (_gitHubService_, $httpBackend) {
        gitHubService = _gitHubService_;
        httpBackend = $httpBackend;
    }));

    it("Performs a get request on the github api", function () {
        var param = "kibo007";
        httpBackend.whenGET("https://api.github.com/users/" + param + "/repos").respond(
            originalData
        );
        gitHubService.get(param).then(function (data) {
            expect(data.data).toEqual(originalData);
        });
        httpBackend.flush();
    });

    it("Performs a get request on the github api using an empty string as param", function () {
        spyOn(gitHubService, "get").and.callFake(function () {
            return "Please enter a name";
        })
        expect(gitHubService.get("")).toBe('Please enter a name');
    })
});


