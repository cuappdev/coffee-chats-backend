import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { SerializedUser, SubSerializedUser } from '../common/types';
import Club from './Club';
import CornellMajor from './CornellMajor';
import Interest from './Interest';
import Matching from './Matching';

@Entity('pear_user')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** User's clubs */
  @ManyToMany(
    type => Club,
    club => club.users
  )
  clubs: Club[];

  /** User's facebook profile link */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  facebook: string | null;

  /** User first name */
  @Column({
    type: 'varchar',
  })
  firstName: string;

  /** Google ID of user */
  @Column({
    type: 'varchar',
  })
  googleID: string;

  /** User's graduation year */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  graduationYear: string | null;

  /** User's hometown */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  hometown: string | null;

  /** User's instagram username */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  instagram: string | null;

  /** User's interests */
  @ManyToMany(
    type => Interest,
    interest => interest.users
  )
  interests: Interest[];

  /** User last name */
  @Column({
    type: 'varchar',
  })
  lastName: string;

  /** Net ID of user */
  @Column({
    type: 'varchar',
  })
  netID: string;

  /** User's major */
  @ManyToOne(
    type => CornellMajor,
    major => major.users,
    { nullable: true }
  )
  major: CornellMajor | null;

  /** User's matchings */
  @ManyToMany(
    type => Matching,
    matching => matching.users
  )
  matches: Matching[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  profilePictureURL: string | null;

  /** User's pronouns */
  @Column({
    type: 'varchar',
    nullable: true,
  })
  pronouns: string | null;

  serialize(): SerializedUser {
    return {
      clubs: this.clubs.map(club => club.serialize()),
      facebook: this.facebook,
      firstName: this.firstName,
      googleID: this.googleID,
      graduationYear: this.graduationYear,
      hometown: this.hometown,
      instagram: this.instagram,
      interests: this.interests.map(interest => interest.serialize()),
      lastName: this.lastName,
      netID: this.netID,
      major: this.major ? this.major.serialize() : null,
      matches: this.matches.map(match => match.subSerialize()),
      profilePictureURL: this.profilePictureURL,
      pronouns: this.pronouns,
    };
  }

  subSerialize(): SubSerializedUser {
    return {
      facebook: this.facebook,
      firstName: this.firstName,
      googleID: this.googleID,
      graduationYear: this.graduationYear,
      hometown: this.hometown,
      instagram: this.instagram,
      lastName: this.lastName,
      netID: this.netID,
      profilePictureURL: this.profilePictureURL,
      pronouns: this.pronouns,
    };
  }
}

export default User;
