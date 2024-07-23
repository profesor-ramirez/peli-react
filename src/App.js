import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap'

const data = [
    { id: 1, pelicula: "The Godfather", plataforma: "Netflix" },
    { id: 2, pelicula: "The Dark Knight", plataforma: "HBO-Max" },
    { id: 3, pelicula: "The Matrix", plataforma: "HBO-Max" },
    { id: 4, pelicula: "The Lord of the Rings", plataforma: "Amazon" },
    { id: 5, pelicula: "Forrest Gump", plataforma: "Apple TV" },
    { id: 6, pelicula: "Inception", plataforma: "Rakuten TV" },
];

class App extends React.Component{

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    state = {
        data: data,
        modalInsertar: false,
        modalActualizar: false,
        form: {
            id: "",
            pelicula: "",
            plataforma: "",
        },
    }

    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };

    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };


    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id == registro.id) {
                arreglo[contador].pelicula = dato.pelicula;
                arreglo[contador].plataforma = dato.plataforma;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };

    eliminar = (dato) => {
        var opcion = window.confirm("Deseas Eliminar el elemento " + dato.id);
        if (opcion == true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id == registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };

    render() {
        return (
            <Container>
                <Button color="success" onClick={() => this.mostrarModalInsertar()}> Agrega nueva pelicula</Button>
                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Pelicula</th>
                            <th>Plataforma</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((elemento)=>
                            <tr>
                                <td>{elemento.id}</td>
                                <td>{elemento.pelicula}</td>
                                <td>{elemento.plataforma}</td>
                                <td>
                                    <Button color="primary" onClick={() => this.mostrarModalActualizar(elemento)}>Editar</Button>
                                    <Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button>

                                </td>   
                            </tr>
                        )}
                    </tbody>
                </Table>
            

           <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                <div><h3>Insertar pelicula</h3></div>
                </ModalHeader>

                <ModalBody>
                <FormGroup>
                    <label> Id:</label>
                    <input className="form-control" readOnly type="text" value={this.state.data.length+1} />
                </FormGroup>
            
                <FormGroup>
                    <label>Pelicula: </label>
                    <input className="form-control" name="pelicula" type="text" onChange={this.handleChange}
                    />
                </FormGroup>
            
                <FormGroup>
                    <label>Plataforma: </label>
                    <input className="form-control" name="plataforma" type="text" onChange={this.handleChange} />
                </FormGroup>
                </ModalBody>

                <ModalFooter>
                <Button color="primary" onClick={() => this.insertar()} > Insertar </Button>
                <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()} > Cancelar </Button>
                </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalActualizar}>
                    <ModalHeader>
                        <div><h3>Editar Registro</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>
                            <input className="form-control" readOnly type="text" value={this.state.form.id} />
                        </FormGroup>

                        <FormGroup>
                            <label>Pelicula:</label>
                            <input className="form-control" name="pelicula" type="text" onChange={this.handleChange} value={this.state.form.pelicula} />
                        </FormGroup>

                        <FormGroup>
                            <label>Plataforma: </label>
                            <input className="form-control" name="plataforma" type="text" onChange={this.handleChange} value={this.state.form.plataforma} />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editar(this.state.form)}> Editar </Button>
                        <Button color="danger" onClick={() => this.cerrarModalActualizar()} > Cancelar </Button>
                    </ModalFooter>
                </Modal>
            </Container>
        );
    }
}

export default App;
