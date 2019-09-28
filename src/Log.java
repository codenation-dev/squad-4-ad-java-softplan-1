import java.util.HashMap;

public class Log {

    private User user; // source of problem
    private String origin; // IP address
    private String date; // TODO: chage to Java date type
    private String id; // unique number for problem log
    private String errorCode; // TODO: functions at Error.java
    private boolean active; // show if log is not archived
    private String client;
    private HashMap extra; // f(error) = extra info of error

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public HashMap getExtra() {
        return extra;
    }

    public void setExtra(HashMap extra) {
        this.extra = extra;
    }

}