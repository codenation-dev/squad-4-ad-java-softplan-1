public class User {

    // Useful attributes
    private String password; // Hash of your psw
    private String token; // Unique ID
    private String email;

    // Use..less
    private String name;

    public User(String password, String token, String email, String name) {
        this.password = password; // TODO: hash string
        this.token = token;
        this.email = email;
        this.name = name;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User [email=" + email + ", name=" + name + ", password=" + password + ", token=" + token + "]";
    }

}