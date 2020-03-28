package me.twodee.bux.Model.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Issue
{
    @Id
    @GeneratedValue
    private Integer id;
    private String name;

    public Issue()
    {}
    public Issue(Integer id, String name)
    {
        this.id = id;
        this.name = name;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }
}
