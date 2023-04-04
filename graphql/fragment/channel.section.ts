import { gql } from '@apollo/client';
import { CHANNEL_TABLE_FIELDS } from './channel.table';
import { MENU_FIELDS } from './menu';
import { SECTION_FIELDS } from './section';

export const CHANNEL_SECTION_FIELDS = gql`
  fragment ChannelSectionFields on ChannelSection {
    id
    active
    menu {
      ...MenuFields
    }
    section {
      ...SectionFields
    }
    tables {
      ...ChannelTableFields
    }
  }
  ${MENU_FIELDS}
  ${SECTION_FIELDS}
  ${CHANNEL_TABLE_FIELDS}
`;
