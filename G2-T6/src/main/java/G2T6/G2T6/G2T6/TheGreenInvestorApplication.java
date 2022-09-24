package G2T6.G2T6.G2T6;

import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.page.AppShellConfigurator;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
@ComponentScan
@NpmPackage(value = "line-awesome", version = "1.3.0")
public class TheGreenInvestorApplication implements AppShellConfigurator {

	public static void main(String[] args) {
		SpringApplication.run(TheGreenInvestorApplication.class, args);
	}

}
