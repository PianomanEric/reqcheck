import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import {useParams} from "react-router-dom";

const memberInfo = {
    eric: {
        name: "Eric Falk",
        description: "Hello! My name is Eric and I am one of the front-end developers for the team. I've only used vanilla JavaScript for past web projects, but I will be learning how to use React and Material UI for this course.",
    },
    erik: {
        name: "",
        description: "",
    },
    alex: {
        name: "Alex Sanchez",
        description: "Hello there! My name is Alex and I the team lead for Team 06. I have experience in full stack, but would like to practice more.",
    },
    victoria: {
        name: "",
        description: "",
    },
    syed: {
        name: "",
        description: "",
    },
    vivek: {
        name: "",
        description: "",
    },
}

const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.substring(1)
}

export default function MemberInfo() {
    const { name } = useParams();

    const nameExists = name in memberInfo;

    useEffect(() => {
        if (!nameExists) {
            document.title = "ReqCheck | Member Not Found";
        } else {
            const uppercaseName = capitalizeName(name);
            document.title = `ReqCheck | About ${uppercaseName}`;
        }
    }, []);

    if (nameExists) {
        if (memberInfo[name].name.length === 0 || memberInfo[name].description.length === 0) {
            return (
                <Typography maxWidth="md" align="center" variant="h4" sx={{
                    width: "100%",
                    py: 6,
                    mx: "auto",
                }}>
                    {`${capitalizeName(name)} has not provided any info`}
                </Typography>
            );
        } else {
            return (
                <Box maxWidth="md" sx={{
                    mx: "auto",
                }}>
                    <Typography align="center" variant="h4" sx={{
                        width: "100%",
                        mt: 3,
                        py: 3,
                    }}>
                        {memberInfo[name].name}
                    </Typography>
                    <Typography paragraph="true" variant="body1" sx={{
                        width: "100%",
                        my: 2,
                    }}>
                        {memberInfo[name].description}
                    </Typography>
                </Box>
            );
        }
    } else {
        return (
            <Typography maxWidth="md" align="center" variant="h4" sx={{
                width: "100%",
                py: 6,
                mx: "auto",
            }}>
                Team member not found!
            </Typography>
        );
    }
}