package G2T6.G2T6.G2T6.views;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

import javax.annotation.security.PermitAll;
import java.util.concurrent.atomic.AtomicInteger;

@Route
@PermitAll
public class MainView extends VerticalLayout {

    public MainView() {
        AtomicInteger count = new AtomicInteger();
        Text questionText = new Text("Question " + count );
        Button questionButton = new Button("Next Question");
        questionButton.addClickListener(e -> questionText.setText("Question " + count.incrementAndGet()));
        add(questionText, questionButton);

    }

}