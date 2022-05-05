// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract TodoList {
    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    event TaskCreated(uint256 id, string content, bool completed);
    event TaskCompleted(uint256 id, bool completed);

    mapping(address => mapping(uint256 => Task)) public tasks;
    mapping(address => uint256) public tasksCount;

    constructor() public {
        createTask("First Task");
    }

    function createTask(string memory _content) public {
        uint256 taskCount = tasksCount[msg.sender];
        tasks[msg.sender][taskCount] = Task(taskCount, _content, false);
        emit TaskCreated(taskCount, _content, false);
        tasksCount[msg.sender]++;
    }

    function toggleCompleted(uint256 _id) public {
        Task memory task = tasks[msg.sender][_id];
        task.completed = !task.completed;
        tasks[msg.sender][_id] = task;
        emit TaskCompleted(_id, task.completed);
    }
}
