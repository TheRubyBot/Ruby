import { readJSONSync } from "fs-extra";
export interface IVersion {
  major: number;
  minor: number;
  build: number;
  revision: number;
  channel: string;
  codename: string;
  string: string;
}

export default (): IVersion => {
  // Major.Minor.Build.Revision

  const pjson = readJSONSync("package.json");
  const [major, minor, build] = pjson.version.split(".").map((x: string) => parseInt(x));
  const { revision, codename, channel } = pjson;
  let versionString = `${major}.${minor}`;
  if (build !== 0) versionString += `.${build}`;
  if (process.env["NODE_ENV"] === "DEVELOPMENT") versionString += `.${revision}-${channel}`;

  return {
    major,
    minor,
    build,
    revision,
    codename,
    channel,
    string: versionString
  };
};
