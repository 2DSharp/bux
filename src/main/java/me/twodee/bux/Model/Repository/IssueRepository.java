package me.twodee.bux.Model.Repository;

import me.twodee.bux.Model.Entity.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, Integer>
{
}
