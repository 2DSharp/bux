package me.twodee.bux.Component;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import me.twodee.bux.DTO.DataTransferObject;
import me.twodee.bux.DTO.HelperValueObject.Error;
import org.junit.jupiter.api.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.junit.jupiter.api.Assertions.*;

class DtoFilterTest {
    @AllArgsConstructor
    @NoArgsConstructor
    static class TestDto extends DataTransferObject {
        private String name;
        private int age;
    }

    @Test
    void testCreation() {
        TestDto dto = new TestDto("John", 12);
        var res = DtoFilter.start(dto).getDtoWithErrors();

        assertThat(res.name, equalTo("John"));
        assertThat(res.age, equalTo(12));

    }

    @Test
    void filterFailure() {
        TestDto dto = new TestDto("John", 12);
        var note = DtoFilter.start(dto).addFilter(e -> e.age > 12, new Error("age", "Age must be greater than 12")).getNotification();

        assertTrue(note.hasErrors());
        assertThat(note.getErrors().get("age"), equalTo("Age must be greater than 12"));
    }

    @Test
    void filterPass() {
        TestDto dto = new TestDto("John", 13);
        var res = DtoFilter.start(dto).addFilter(e -> e.age > 12, new Error("age", "Age must be greater than 12")).getDtoWithErrors();

        assertFalse(res.getNotification().hasErrors());
    }

    @Test
    void chainFiltersOrder() {
        TestDto dto = new TestDto("John", 12);
        dto = DtoFilter.start(dto)
                .addFilter(e -> e.age > 12, new Error("age", "Age must be greater than 12"))
                .addFilter(e -> e.name.equals("Sean"), new Error("name", "Name doesn't equal Sean")).getDtoWithErrors();

        assertTrue(dto.getNotification().hasErrors());
        assertFalse(dto.getNotification().getErrors().containsKey("name"));
        assertTrue(dto.getNotification().getErrors().containsKey("age"));

        dto = new TestDto("John", 12);

        dto = DtoFilter.start(dto)
                .addFilter(e -> e.name.equals("Sean"), new Error("name", "Name doesn't equal Sean"))
                .addFilter(e -> e.age > 12, new Error("age", "Age must be greater than 12")).getDtoWithErrors();

        assertTrue(dto.getNotification().hasErrors());
        assertTrue(dto.getNotification().getErrors().containsKey("name"));
        assertFalse(dto.getNotification().getErrors().containsKey("age"));
    }

    @Test
    void testAppendedFilters_NoEffectsOnAbove() {
        TestDto dto = new TestDto("John", 12);
        var note = DtoFilter.start(dto)
                .addFilter(e -> e.age > 12, new Error("age", "Age must be greater than 12"))
                .appendFilter(e -> e.name.equals("Sean"), new Error("name", "Name doesn't equal Sean"))
                .addFilter(e -> e.name.equals("Done"), new Error("name2", "The second filter should work too")).getNotification();

        assertTrue(note.hasErrors());
        assertFalse(note.getErrors().containsKey("name"));
        assertTrue(note.getErrors().containsKey("age"));
    }

    @Test
    void testAppendedFilters() {
        TestDto dto = new TestDto("John", 13);
        dto = DtoFilter.start(dto)
                .addFilter(e -> e.age > 12, new Error("age", "Age must be greater than 12"))
                .appendFilter(e -> e.name.equals("Sean"), new Error("name", "Name doesn't equal Sean"))
                .addFilter(e -> e.name.equals("Done"), new Error("name2", "The second filter should work too")).getDtoWithErrors();

        assertTrue(dto.getNotification().hasErrors());
        assertTrue(dto.getNotification().getErrors().containsKey("name"));
        assertTrue(dto.getNotification().getErrors().containsKey("name2"));
    }

    @Test
    void testAppendedFilters_DoesntContinueAfterBlock() {
        TestDto dto = new TestDto("John", 13);
        dto = DtoFilter.start(dto)
                .addFilter(e -> e.age > 12, new Error("age", "Age must be greater than 12"))
                .appendFilter(e -> e.name.equals("Sean"), new Error("name", "Name doesn't equal Sean"))
                .addFilter(e -> e.name.equals("Done"), new Error("name2", "The second filter should work too"))
                .addFilter(e -> e.name.equals("Woop"), new Error("name3", "Shouldn't reach here")).getDtoWithErrors();

        assertTrue(dto.getNotification().hasErrors());
        assertFalse(dto.getNotification().getErrors().containsKey("age"));
        assertTrue(dto.getNotification().getErrors().containsKey("name"));
        assertTrue(dto.getNotification().getErrors().containsKey("name2"));
        assertFalse(dto.getNotification().getErrors().containsKey("name3"));

    }
}