-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2019 at 11:34 AM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cab_booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `cab_details`
--

CREATE TABLE `cab_details` (
  `cab_id` int(10) NOT NULL,
  `cab_no` varchar(20) DEFAULT NULL,
  `capacity` int(10) DEFAULT NULL,
  `from_contract_period` varchar(255) DEFAULT NULL,
  `to_contract_period` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `driver_name` varchar(30) DEFAULT NULL,
  `driver_phno` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cab_details`
--

INSERT INTO `cab_details` (`cab_id`, `cab_no`, `capacity`, `from_contract_period`, `to_contract_period`, `provider`, `driver_name`, `driver_phno`) VALUES
(1, 'TS 03 AN 4475', 7, '2019-12-16', '2020-12-01', 'Nikhil cab providers', 'Reyhan', '9030150094'),
(2, 'TS 03 EV 7081', 4, '2019-12-01', '2020-12-31', 'Nikhil cab providers', 'Jayakar', '9030150093'),
(3, 'TS 03 AT 8045', 4, '2019-12-01', '2020-12-31', 'Nikhil cab providers', 'Ganesh', '9030150091'),
(4, 'TS 03 ZX 1215', 4, '2019-12-01', '2020-12-31', 'Nikhil cab providers', 'Nikhil', '9030150095'),
(5, 'TS 03 UA 6597', 4, '2019-12-01', '2020-12-31', 'Nikhil cab providers', 'Shabeer', '9030150090');

-- --------------------------------------------------------

--
-- Table structure for table `cab_requests`
--

CREATE TABLE `cab_requests` (
  `request_Id` int(20) NOT NULL,
  `emp_Id` int(10) DEFAULT NULL,
  `pickup_Location` varchar(255) DEFAULT NULL,
  `from_Date` varchar(255) DEFAULT NULL,
  `to_Date` varchar(255) DEFAULT NULL,
  `shift_Time` varchar(255) DEFAULT NULL,
  `manager` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cab_requests`
--

INSERT INTO `cab_requests` (`request_Id`, `emp_Id`, `pickup_Location`, `from_Date`, `to_Date`, `shift_Time`, `manager`, `status`) VALUES
(2, 1, 'Gachibowli', '2019-12-16', '2019-12-31', '14:00', 'venu kumar', 'Assigned');

-- --------------------------------------------------------

--
-- Table structure for table `trip_details`
--

CREATE TABLE `trip_details` (
  `request_id` int(10) NOT NULL,
  `pickup_location` varchar(255) DEFAULT NULL,
  `from_date` varchar(255) DEFAULT NULL,
  `to_date` varchar(255) DEFAULT NULL,
  `pickup_time` varchar(255) DEFAULT NULL,
  `cab_no` varchar(255) DEFAULT NULL,
  `driver_name` varchar(255) DEFAULT NULL,
  `driver_phno` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `trip_details`
--

INSERT INTO `trip_details` (`request_id`, `pickup_location`, `from_date`, `to_date`, `pickup_time`, `cab_no`, `driver_name`, `driver_phno`) VALUES
(2, 'Gachibowli', '12:00', '', '2019-12-31', 'TS 03 AN 4475', 'Reyhan', '9030150094');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `emp_id` int(50) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `manager` varchar(255) DEFAULT NULL,
  `project` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `token` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`emp_id`, `name`, `password`, `email`, `manager`, `project`, `role`, `token`) VALUES
(1, 'jay', 'jay', 'jay@gmail.com', 'venu kumar', 'citrix-sapho', 'employee', NULL),
(2, 'venu kumar', 'venu', 'venu@gmail.com', 'srinivas', 'citrix-sapho', 'employee/manager', 2147483647),
(3, 'admin', 'admin', 'admin@gmail.com', 'naresh', 'hr', 'admin', 2147483647),
(4, 'gan', 'gan', 'gan@gmail.com', 'venu kumar', 'citrix-sapho', 'employee', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cab_details`
--
ALTER TABLE `cab_details`
  ADD PRIMARY KEY (`cab_id`);

--
-- Indexes for table `cab_requests`
--
ALTER TABLE `cab_requests`
  ADD PRIMARY KEY (`request_Id`);

--
-- Indexes for table `trip_details`
--
ALTER TABLE `trip_details`
  ADD PRIMARY KEY (`request_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`emp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cab_details`
--
ALTER TABLE `cab_details`
  MODIFY `cab_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cab_requests`
--
ALTER TABLE `cab_requests`
  MODIFY `request_Id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `emp_id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
