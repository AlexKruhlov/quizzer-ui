# Question creating feature

## 1. Question Creating Page Area

- [x] I as a User can see empty field to have a possibility to input some question text.
- [x] I as a User can clear field for inputting question clicking on the appropriate button.
- [x] I as a User can choose one of two question types: **single** (default) or **multiple**.
- [x] I as a User can see empty field to have a possibility to input answer option (several answer options).
- [x] I as a User can clear any of input fields for answer options.
- [x] I as a User can delete any of input fields for answer options.
- [x] I as a User can edit question text and existing answer option fields.
- [x] I as a User can save into database whole question (question text, answer options, etc.).
- [x] I as a User cannot save whole question if question text field is empty.
- [x] I as a User cannot save whole question if all existing answer option fields are empty.
- [x] I as a User can only save existing (non-empty) answer options.
- [x] I as a User can see existing (non-empty) answer options count.
- [x] I as a User can cancel all inputs. As a result:

  * question text field should be empty;
  * answer options fields should be removed excepts one which should be empty;
  * answer options count should be equal to `0`;
  * question type should be set to default;

## 2. Question Interactive Preview Page Area

1. I as a User can see page area that shows me current question preview interactively:

* non-empty question text;
* non-empty answer options;
* answer options should be shown in accordance with question type.

## 3. Question List Page Area

1. I as a User can see list of all saved questions (question text should only be shown) in following format:
   ```
   [question number]. question text
   ```
   For example,
   ```
   1. What is your name?
   ```

2. I as a User can delete any of existing question with confirmation.
3. I as a User can edit any of existing question.
4. I as a User can search any of existing question.
