import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Input,
    Tag,
    TagLabel,
    TagCloseButton,
    FormControl,
    FormLabel,
    Button,
    Wrap,
    WrapItem,
    Flex,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import conf from "../../conf/conf";
import { login } from "../../store/authSlice.js";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader.jsx";

const skills = [
    "C++",
    "Java",
    "Python",
    "HTML",
    "CSS",
    "Javascript",
    "Node JS",
    "React Native",
    "Android",
    "iOS",
    "Django",
    "Ruby on Rails",
    "Next JS",
    "Angular",
    "Vue",
    "Bootstrap",
    "SQL",
    "MongoDB",
    "NoSQL",
    "Data Structures",
    "Algorithms",
    "OOPS",
    "Problem Solving",
    "Communication",
    "Time Management",
    "Project Discussions",
    "System Design",
    "Kotlin",
    "Objective-C",
    "AWS",
    "Microsoft Azure",
    "GCP",
    "Devops",
    "Docker",
    "Kubernetes",
    "Autoscaling",
    "Performance Testing",
    "Hadoop",
    "Linux",
    "Programming Languages",
    "DBMS",
    "Computer Networks",
    "Product Strategy",
    "Product Planning",
    "Product Roadmap",
    "Market Research and Analysis",
    "Go-to-Market (GTM) Strategy",
    "Product Lifecycle Management",
    "Product Pricing",
    "Monetization",
    "Compliance",
    "Product Partnerships",
    "Product Innovation",
    "Product Research",
    "Scope Management",
    "Scrum and Agile Practices",
    "Cost Management",
    "Risk Management",
    "Quality Management",
    "Stakeholder Management",
    "Resource Management",
    "Procurement Management",
    "Change Management",
    "Health, Safety, and Environmental (HSE) Management",
    "Knowledge Management",
    "Data Science",
    "Machine Learning",
    "Data Analyst",
    "Data Engineering",
    "Typescript",
    "Jquery",
    "Selenium",
    "Jmeter",
    "PowerBI",
    "Azure+",
    "Terraform",
    "GITHUB",
    "Flask",
    "Datadog",
    "Redshift",
    "Looker",
    "R",
    "Redux",
    "ETL frameworks",
    "Photoshop",
    "Illustrator",
    "GIT",
    "RDBMS",
    "JWT",
    "Fusion",
    "Fix Bugging",
    "Product Designing",
    "UI/UX",
    "Artificial Intelligence",
    "Google Apps Script",
    "UiPath",
    "Kibana",
    "Google Cloud",
    "Xamarin",
    "Jenkins",
    "Hive",
    "Spark",
    "Adobe Analytics",
    "SAP Analytics",
    "XD",
    "Couchbase",
    "NestJS",
    "Gitlab",
    "Salesforce",
    ".NET",
    "JUnit",
    "Object Oriented Design",
    "Database Design",
    "Kanban",
    "Postgress SQL",
    "TSQL",
    "Webforms",
    "MS Identity",
    "Bash",
    "CI/CD tools",
    "Project Management",
    "Oracle Cloud Infrastructure",
    "Hibernate",
    "Embeded System",
    "Postman",
    "Redmine",
    "Visual Studio",
    "Eclipse",
    "IntelliJ",
    "Debugging Skills",
    "Web Development",
    "API Development",
    "Dynamics 365",
    "Data Cleaning",
    "Data Evangelism",
    "Data Integration",
    "Data Integrity",
    "Data Mining",
    "Data Visualization",
    "Database Querying",
    "Dependency Management",
    "Rally",
    "API testing",
    "AWS SageMaker",
    "Azure ML Service",
    "Databricks",
    "MLflow",
    "Tecton",
    "Pinecone",
    "Kinesis",
    "Bitbucket",
    "Qlik",
    "ElasticSearch",
    "Redis",
    "Tomcat",
    "RabbitMQ",
    "Tekton",
    "Gradle",
    "Quarkus",
    "Spring MVC",
    "AJAX",
    "Product Architecture",
    "DDB",
    "RDS",
    "React JS",
    "Node",
    "Cocoa framework",
    "JSX",
    "SVN",
    "PCF",
    "PowerShell",
    "Dart",
    "ML Algorithms",
    "Backbone JS",
    "Networking",
    "Unit Testing",
    "Mocha",
    "Webpack",
    "Flux",
    "High Performance Code",
    "PgSQL",
    "BigQuery",
    "Ethereum",
    "Quorum",
    "Writing Skill",
    "Leadership",
    "sales",
    "CyberSecurity",
    "Outlook",
    "Troubleshooting",
    "Cryptography",
    "Solidity",
    "Blockchain",
];

const SkillsForm = () => {
    const { handleSubmit } = useForm();
    const userSkills = useSelector((state) => state.auth.userData?.skills);
    const [selectedSkills, setSelectedSkills] = useState(userSkills || []);
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoader, setIsLoader] = useState(false)

    const onSubmit = async (data) => {
        // Make an API call to update user skills
        setIsLoader(true)
        try {
            const response = await fetch(
                `${conf.backendUser}/updateSkillsDetails`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ skills: selectedSkills }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                dispatch(login(data.data));
                navigate("/update-details/edit-education");
            } else {
                throw new Error("Skills update error");
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoader(true)
    };

    const handleAddSkill = (skill) => {
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleRemoveSkill = (skill) => {
        setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    };

    useEffect(() => {
        setSelectedSkills(userSkills || []);
    }, [userSkills]);

    const filteredSkills = skills.filter((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
    );
const linkColor = useColorModeValue("blue.500", "blue.300");
    return isLoader? <Loader/> : (
        <Box
            maxW="600px"
            alignSelf={"center"}
            p={4}
        >
            <NavLink to="/feed">
                <Button
                    leftIcon={<ArrowBackIcon />}
                    variant="link"
                    mb={4}
                    color={linkColor}
                >
                    Back To Application
                </Button>
            </NavLink>
            <Text
                fontSize={"2xl"}
                fontWeight={"bold"}
                mb={"2"}
            >
                Edit Your Skills
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="skills">
                    <FormLabel>Select skills, tools, roles</FormLabel>
                    <Input
                        placeholder="Search Skills"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Wrap mt={2}>
                        {selectedSkills.map((skill) => (
                            <WrapItem key={skill}>
                                <Tag
                                    size="lg"
                                    borderRadius="full"
                                    variant="solid"
                                    colorScheme="blue"
                                >
                                    <TagLabel>{skill}</TagLabel>
                                    <TagCloseButton
                                        onClick={() => handleRemoveSkill(skill)}
                                    />
                                </Tag>
                            </WrapItem>
                        ))}
                    </Wrap>
                    <Box
                        mt={4}
                        maxH="200px"
                        overflowY="auto"
                    >
                        <Wrap>
                            {filteredSkills.map((skill) => (
                                <WrapItem key={skill}>
                                    <Tag
                                        size="lg"
                                        borderRadius="full"
                                        variant="subtle"
                                        colorScheme={
                                            selectedSkills.includes(skill)
                                                ? "blue"
                                                : "gray"
                                        }
                                        cursor="pointer"
                                        onClick={() => handleAddSkill(skill)}
                                    >
                                        <TagLabel>{skill}</TagLabel>
                                        {!selectedSkills.includes(skill) && (
                                            <AddIcon ml={2} />
                                        )}
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                </FormControl>
                <Button
                    mt={4}
                    colorScheme="teal"
                    type="submit"
                >
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default SkillsForm;
