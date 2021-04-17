// ✨ 드림코딩 엘리 9강 유용한 10가지 배열 함수들(Array APIs 총정리)

// Q1. make a string out of an array
{
    const fruits = ['apple', 'banana', 'orange'];

    console.log(fruits.toString()); // apple,banana,orange
    // Array.prototype.toString()
  }
  
  // Q2. make an array out of a string
  {
    const fruits = '🍎, 🥝, 🍌, 🍒';

    console.log(fruits.split(', '));
    // String.prototype.split()
  }
  
  // Q3. make this array look like this: [5, 4, 3, 2, 1]
  {
      const array = [1, 2, 3, 4, 5];

      console.clear();
      // 내림차순 정렬
      // Array.prototype.sort()
    array.sort((a, b) => b-a);
    console.log(array);
    // sort는 해당 배열을 변형시킨다.
  }
  
  // Q4. make new array without the first two elements
  {
    const array = [1, 2, 3, 4, 5];

    console.clear();
    array.splice(0, 2);
    console.log(array);
    // Q. 원래 배열을 변형시키는 방법 말고 새로운 배열을 리턴하는 API는 없나?
    // Array.prototype.splice() 일단 splice() 썼음
  }
  
  /**
   * 
  */

  class Student {
    constructor(name, age, enrolled, score) {
      this.name = name;
      this.age = age;
      this.enrolled = enrolled;
      this.score = score;
    }
  }
  const students = [
    new Student('A', 29, true, 45),
    new Student('B', 28, false, 80),
    new Student('C', 30, true, 90),
    new Student('D', 40, false, 66),
    new Student('E', 18, true, 88),
  ];
  
  // Q5. find a student with the score 90
  {
      console.clear();
        console.log(students.filter((student) => student['score'] === 90));

  }
  
  // Q6. make an array of enrolled students
  {
  }
  
  // Q7. make an array containing only the students' scores
  // result should be: [45, 80, 90, 66, 88]
  {
  }
  
  // Q8. check if there is a student with the score lower than 50
  {
  }
  
  // Q9. compute students' average score
  {
  }
  
  // Q10. make a string containing all the scores
  // result should be: '45, 80, 90, 66, 88'
  {
  }
  
  // Bonus! do Q10 sorted in ascending order
  // result should be: '45, 66, 80, 88, 90'
  {
  }