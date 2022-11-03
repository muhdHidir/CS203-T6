package G2T6.G2T6.G2T6.models.orders;

import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.Size;

import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
public class QuestionOrder {
    // id is the primary key of question order in questionOrderRepository
    private @Id @GeneratedValue (strategy = GenerationType.IDENTITY) Long id;

    // indexArray must be size 10
    @Size(min = 10, max = 10)
    private ArrayList<Integer> indexArray;
    
    public QuestionOrder() {
        // generate array of 0 to 11
        // ArrayList<Integer> generatedArray = super.generateArray(12);  

        // generate arraylist
        ArrayList<Integer> generatedArray = new ArrayList<>();
        Collections.addAll(generatedArray, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11); 
        
        // set indexArray as manipulate array
        this.indexArray = manipulateArray(generatedArray);
    }
    
    public ArrayList<Integer> manipulateArray(ArrayList<Integer> array){
        // store input array as manipulatedArray
        ArrayList<Integer> manipulatedArray = array;

        // randomly remove 2 out of first 10 questions (keep question 11 & 12 which are open ended)
        Random random = new Random();
        manipulatedArray.remove(random.nextInt(10));
        manipulatedArray.remove(random.nextInt(9));

        // shuffle their orders
        Collections.shuffle(manipulatedArray);

        return manipulatedArray;
    }
}
