package G2T6.G2T6.G2T6.services;

import java.util.List;

import G2T6.G2T6.G2T6.models.Question;

public interface QuestionService {
    List<Question> listQuestions();
    Question getQuestion(Long id);
    Question addQuestion(Question question);
    Question updateQuestion(Long id, Question question);
    void deleteQuestion(Long id);
}
