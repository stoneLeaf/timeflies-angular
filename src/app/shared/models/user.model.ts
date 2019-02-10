/**
 * Class representing a user.
 */
export class User {
  profile: {
    name: string;
    email: string;
    hashedEmail: string;
    preferences: {
      seenDashboardNotice: boolean;
    }
  };
  gravatar: string;
  password: string;
}
