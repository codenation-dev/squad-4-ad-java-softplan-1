import { useContext, useState, useRef, useCallback } from "react"
import { Button, Header, Icon, Message, Modal, Segment, Form } from "semantic-ui-react"
import { ClientDetailDTO } from "../_api/swagger/api-types"
import { patchUserSelfUsingPATCH } from "../_api/swagger/modules/Users"
import { formatError } from "../_common/formatError"
import { showToast } from "../_common/ToastService"
import { userContext } from "../_common/Wireframe"
import { createClientUsingPOST, resetTokenUsingPOST } from "../_api/swagger/modules/Clients"

type ModalTypes = "token" | "remove" | "newclient" | "resetToken"

export function ClientList() {
  const ctx = useContext(userContext)
  const clients = ctx.user.clients
  const [showModal, setShowModal] = useState<null | {
    client: ClientDetailDTO
    modalType: ModalTypes
  }>(null)

  function activateModal(modalType: ModalTypes, client: ClientDetailDTO) {
    return ev => {
      setShowModal({ modalType, client })
    }
  }

  function closeModal() {
    setShowModal(null)
  }

  async function removeClientFromModal() {
    try {
      const modalId = showModal?.client.id
      const newClientsList = (clients || []).filter(client => client.id !== modalId)
      const newClientsIds = newClientsList.map(c => c.id!)
      await patchUserSelfUsingPATCH({
        body: {
          clients: newClientsIds
        }
      })
      setShowModal(null)
      ctx.refresh()
    } catch (err) {
      showToast("error", formatError(err))
    }
  }

  async function confirmNewClient(name: string) {
    console.log("new client", name)
    setShowModal(null)
    const newClient = await createClientUsingPOST({
      client: {
        name
      }
    })
    try {
      const newClientsList = [...(ctx.user.clients || []).map(c => c.id!), newClient.id!]
      await patchUserSelfUsingPATCH({
        body: {
          clients: newClientsList
        }
      })
      showToast("success", "Cliente adicionado com sucesso.")
      ctx.refresh()
    } catch (err) {
      showToast("error", formatError(err))
    }
  }

  async function confirmTokenReset(client: ClientDetailDTO) {
    try {
      setShowModal(null)
      await resetTokenUsingPOST({ clientId: client.id! })
      ctx.refresh()
      showToast("success", "Chave recriada com sucesso.")
    } catch (err) {
      showToast("error", formatError(err))
    }
  }

  if (!clients) return null

  return (
    <div className="_clients">
      <h3 className="ui header">
        Clientes
        <Button
          basic
          style={{ marginLeft: "14px" }}
          onClick={activateModal("newclient", null as any)}
        >
          Novo...
        </Button>
      </h3>

      <div className="_list">
        {clients && (
          <Segment.Group>
            {clients.map(client => (
              <Segment key={client.id}>
                <div className="_clientName">{client.name}</div>
                <div className="_action ui basic button" onClick={activateModal("token", client)}>
                  Ver token
                </div>
                <div
                  className="_action ui basic button"
                  onClick={activateModal("resetToken", client)}
                >
                  Redefinir token
                </div>
                <div
                  className="_action ui negative basic button"
                  onClick={activateModal("remove", client)}
                >
                  Remover
                </div>
              </Segment>
            ))}
          </Segment.Group>
        )}
        {clients && !clients.length && <Message>Nenhum cliente cadastrado.</Message>}
      </div>
      {showModal && showModal.modalType === "token" && (
        <TokenModal client={showModal.client} onClose={closeModal} />
      )}
      {showModal && showModal.modalType === "remove" && (
        <RemoveModal
          client={showModal.client}
          onCancel={closeModal}
          onConfirm={removeClientFromModal}
        />
      )}
      {showModal && showModal.modalType === "newclient" && (
        <NewClientModal onConfirm={confirmNewClient} onCancel={closeModal} />
      )}
      {showModal && showModal.modalType === "resetToken" && (
        <ResetTokenModal client={showModal.client} onCancel={close} onConfirm={confirmTokenReset} />
      )}
    </div>
  )
}

function TokenModal(i: { client: ClientDetailDTO; onClose: () => void }) {
  return (
    <Modal open={true} size="small">
      <Header content="Token do cliente"></Header>
      <Modal.Content>
        <div className="token_display">{i.client.apiToken}</div>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={i.onClose}>
          <Icon name="checkmark" /> OK
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

function ResetTokenModal(i: {
  client: ClientDetailDTO
  onCancel: () => void
  onConfirm: (c: ClientDetailDTO) => any
}) {
  return (
    <Modal open={true} size="small">
      <Header content="Gerar novo token"></Header>
      <Modal.Content>
        <p>Gerar novo token pra este cliente?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => i.onConfirm(i.client)}>
          OK
        </Button>
        <Button onClick={i.onCancel}>Cancelar</Button>
      </Modal.Actions>
    </Modal>
  )
}

function RemoveModal(i: { client: ClientDetailDTO; onCancel: () => void; onConfirm: () => void }) {
  return (
    <Modal open={true} size="small">
      <Header content="Remover cliente"></Header>
      <Modal.Content>
        <p>Remover cliente deste usuário?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={i.onConfirm}>
          Remover
        </Button>
        <Button onClick={i.onCancel}>Cancelar</Button>
      </Modal.Actions>
    </Modal>
  )
}

function NewClientModal(i: { onConfirm: (name: string) => any; onCancel: () => void }) {
  const $inputRef = useRef<HTMLInputElement>(null)
  const $formRef = useRef<HTMLFormElement>(null)
  const handleForm = (ev?) => {
    ev && ev.preventDefault()
    const name = $inputRef.current?.value
    i.onConfirm(name || "")
  }
  return (
    <Modal open={true}>
      <Header content="Adicionar novo cliente"></Header>
      <Modal.Content className="form">
        <form className="ui form" ref={$formRef} onSubmit={handleForm}>
          <Form.Field>
            <label>Nome</label>
            <input placeholder="Nome" ref={$inputRef}></input>
          </Form.Field>
        </form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => {
            handleForm()
          }}
        >
          Criar
        </Button>
        <Button basic onClick={i.onCancel}>
          Cancelar
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
