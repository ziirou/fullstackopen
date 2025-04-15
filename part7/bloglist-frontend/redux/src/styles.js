import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  max-width: 50em;
  border-radius: 1em;
  box-shadow: 0 0.125em 0.5em rgba(0, 0, 0, 0.5);
`

const MainContainer = styled(Container)`
  background: ghostwhite;
  margin: 0 auto;
`

const FormContainer = styled(Container)`
  background: wheat;
  margin: 1em auto;
`

const MenuBar = styled.menu`
  background: dodgerblue;
  padding: 0.5em 2em;
  border-radius: 0.25em;
`

const MenuText = styled.span`
  color: white;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: navy;
  font-weight: bold;

  &:hover {
    color: darkblue;
    text-decoration: underline;
  }

  &:active {
    color: midnightblue;
  }
`

const MenuLink = styled(StyledLink)`
  background: lightsteelblue;
  padding: 0.25em 0.5em;
  margin-right: 0.5em;
  border-radius: 0.15em;
`

const H1Header = styled.h1`
  font-size: 2em;
  color: navy;
`

const H2Header = styled.h2`
  font-size: 1.5em;
  color: midnightblue;
`

const H3Header = styled.h3`
  font-size: 1.2em;
  color: darkblue;
`

const CommonButton = styled.button`
  background: plum;
  color: indigo;
  font-size: 1em;
  padding: 0.25em 0.5em;
  border: 0.125em solid indigo;
  border-radius: 0.2em;
  margin: 0.25em;
`

const GoodButton = styled(CommonButton)`
  background: palegreen;
  color: darkgreen;
  border-color: darkgreen;
`

const BadButton = styled(CommonButton)`
  background: salmon;
  color: darkred;
  border-color: darkred;
`

const Input = styled.input`
  background: aliceblue;
  font-size: 1em;
  padding: 0.25em;
  border-radius: 0.2em;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Table = styled.table`
  background: aliceblue;
  text-align: center;
  padding: 0.75em;
  border: 0.125em solid indigo;
  border-radius: 0.25em;
`

const TableData = styled.td`
  background: ghostwhite;
  padding: 0.25em 0.75em;
  border: 0.1em solid indigo;
  border-radius: 0.2em;
`

const UList = styled.ul`
  background: aliceblue;
  padding: 0.25em;
  border: 0.1em solid indigo;
  border-radius: 0.25em;
`

const ListItem = styled.li`
  padding: 0.25em;
`

const NotificationDiv = styled.div`
  background: ${(props) =>
    props.$type === 'error'
      ? 'tomato'
      : props.$type === 'warning'
        ? 'yellow'
        : 'forestgreen'};
  color: black;
  font-size: 1.5em;
  border-style: solid;
  border-radius: 0.5em;
  padding: 0.5em;
  margin-bottom: 1em;
`

export {
  MainContainer,
  FormContainer,
  MenuBar,
  MenuText,
  StyledLink,
  MenuLink,
  H1Header,
  H2Header,
  H3Header,
  CommonButton,
  GoodButton,
  BadButton,
  Input,
  Form,
  Table,
  TableData,
  UList,
  ListItem,
  NotificationDiv,
}
