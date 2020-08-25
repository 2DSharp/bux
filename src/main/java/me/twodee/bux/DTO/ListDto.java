package me.twodee.bux.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ListDto<T> extends DataTransferObject {
    List<T> list = new ArrayList<>();

    public ListDto(List<T> list) {
        this.list = list;
    }
}
