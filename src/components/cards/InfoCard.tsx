import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 135,
    width: 185,
  },
  control: {
    padding: theme.spacing(2),
  },
  pos: {
    marginBottom: 12,
  },
}));

type TypographyColor =
  | "initial"
  | "inherit"
  | "primary"
  | "secondary"
  | "textPrimary"
  | "textSecondary"
  | "error";

type InfoCardProps = {
  onClick?: () => void;
  header?: string;
  subHeader?: string;
  body?: string;
  footer?: string;
  footerColor?: TypographyColor;
};

export const InfoCard = ({
  onClick,
  header,
  subHeader,
  body,
  footer,
  footerColor,
}: InfoCardProps) => {
  const classes = useStyles();
  return (
    <Card
      style={{ margin: "10px 10px 10px 10px" }}
      className={classes.paper}
      onClick={onClick}
    >
      <CardContent>
        <Typography
          style={{ fontSize: 14, overflow: "hidden", textOverflow: "ellipsis" }}
          color="textSecondary"
          gutterBottom
        >
          {header}
        </Typography>
        <Typography
          style={{ fontSize: 14, overflow: "hidden", textOverflow: "ellipsis" }}
          className={classes.pos}
          color="textSecondary"
          gutterBottom
        >
          {subHeader}
        </Typography>
        <Typography
          variant="h5"
          component="h2"
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {body}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          color={footerColor}
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {footer}
        </Typography>
      </CardContent>
    </Card>
  );
};
