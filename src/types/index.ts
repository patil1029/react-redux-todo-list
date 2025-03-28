export type dropDown = {
  name: string,
  value: string
}

export type validation = {
  emailError: string | null,
  passwordError: string | null,
  confirmPassErr: string | null,
  requiredEmailErr: string | null,
  requiredPasswordErr: string | null,
  requiredNameErr: string | null,
}

export type validations = {
  listName: string | null,
  taskName: string | null,
}

export type List = ListItem[]

export type ListItem = {
  id: number,
  name: string,
  listId: number
}

export type selectedList = {
  index: number
  listId: number,
  userId: number
}

export type listContentState = Array<listContent>

export type listContent = {
  id: number,
  name: string,
  userId: number,
  list_items: Array<ListItem>
}

export type createListItem = {
  name: string
}

export type createListPayload = {
  name: string,
  list_items: [createListItem]
}


export type tokenContentType =
  ({
    id: number,
    name: string,
    email: string,
    iat: number,
    exp: number
  }) | null

export type loginPayload = {
  email: string,
  password: string
}


export interface signUpPayload extends loginPayload {
  name: string,
}
