import { Challenge } from "../../domain/entities/challenge";
import { Student } from "../../domain/entities/student";
import { InMemoryChallengesRepository } from "../../tests/inMemoryRepositoryChallenges";
import { InMemoryStudentsRepository } from "../../tests/inMemoryRepositoryStudents";
import { CreateChallengeSubmission } from "./createChallengeSubmission";

describe("Create challenge submission use case", () => {
  it("should be able to create a new challenge submission", async () => {
    const studentsRepository = new InMemoryStudentsRepository();
    const challengeRepository = new InMemoryChallengesRepository();

    const student = Student.create({
      name: "Matheus",
      email: "doe@example.com",
    });

    const challenge = Challenge.create({
      title: "Challenge 01",
      instructionsUrl: "http://example.com",
    });

    studentsRepository.items.push(student);
    challengeRepository.items.push(challenge);

    const createChallengeSubmission = new CreateChallengeSubmission(
      studentsRepository,
      challengeRepository
    );

    const response = await createChallengeSubmission.execute({
      studentId: student.id,
      challengeId: challenge.id
    });

    expect(response).toBeTruthy();
  });
});
