// Your code here
function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payPerHour] = employeeData;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(employeeDataList) {
    return employeeDataList.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, timestamp) {
    const [date, time] = timestamp.split(" ");
    const hour = parseInt(time, 10);
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour,
      date,
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, timestamp) {
    const [date, time] = timestamp.split(" ");
    const hour = parseInt(time, 10);
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour,
      date,
    });
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find((event) => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      
      return (timeOutEvent.hour / 100) - (timeInEvent.hour / 100);
    }
    return 0;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hours = hoursWorkedOnDate(employeeRecord, date);
    return hours * employeeRecord.payPerHour;
  }
  
  function allWagesFor(employeeRecord) {
    const datesWorked = new Set();
    employeeRecord.timeInEvents.forEach((event) => datesWorked.add(event.date));
    employeeRecord.timeOutEvents.forEach((event) => datesWorked.add(event.date));
  
    let totalWages = 0;
    datesWorked.forEach((date) => {
      totalWages += wagesEarnedOnDate(employeeRecord, date);
    });
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
    employeeRecords.forEach((record) => {
      totalPayroll += allWagesFor(record);
    });
    return totalPayroll;
  }
  