package me.twodee.bux.Model.Service;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static me.twodee.bux.Util.BaseUtil.dragAndDrop;

class GoalServiceTest {


    @Test
    void testReorder() {
        List<String> list = new ArrayList<>();
        list.add("A");
        list.add("B");
        list.add("C");
        list.add("D");

        System.out.println("ORIGINAL: " + list);


        System.out.println("CHANGED: " + dragAndDrop(list, 2, 3));
    }
}