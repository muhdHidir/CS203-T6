package G2T6.G2T6.G2T6.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "users",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = "username"),
           @UniqueConstraint(columnNames = "email")
       })
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

  // @ManyToMany(fetch = FetchType.LAZY)
  // @JoinTable(name = "user_roles", 
  //            joinColumns = @JoinColumn(name = "user_id"),
  //            inverseJoinColumns = @JoinColumn(name = "role_id"))
  // private Set<Role> roles = new HashSet<>();

  @NotBlank
  private String role;

  public User() {
  }

  public User(String username, String email, String password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // public User(String username, String email, String password, Set<Role> role) {
  //   this(username, email, password);
  //   setRoles(roles);
  // }

  public User(String username, String email, String password, String role) {
    this(username, email, password);
    this.role = role;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  // public Set<Role> getRoles() {
  //   return roles;
  // }  
  
  public String getRole() {
    return this.role;
  }

  // public void setRoles(Set<Role> roles) {
  //   this.roles = roles;
  // }

  public void setRole(String role) {
    this.role = role;
  }
}
