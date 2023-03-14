import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { postJugador } from "../../Redux/Actions";

export const FormularioJugador = () => {

    let dispatch = useDispatch()
 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
 
  //   nombre: "",
  //   color: "",
  //   puntos: 0,
  //   copas: 0,
  //   campañas: 0,
  //   ranking: 1,
  //   partidas: 0,
  //   puntosPartidas: [],
  //   colonias: 0,
  //   victorias: 0,
  //   victoriasEspeciales: 0,
  //   ataqueSolitario: 0,
  //   defensaSolitaria: 0,
  //   foto: "",
  //   escudo: "",
  //   cumpleaños: "",
  //   biografia: "",
  //   partidasDeCopa: [],
  //   podioCopa: [],
  //   copasJugadas: [],
  //   campañaGanada: false,
  // });

  const onSubmit = (data) => {
   console.log(data)
      dispatch(postJugador(data))
    
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      <div className="col-md-6">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input
          {...register("nombre", { required: true })}
          id="nombre"
          type="text"
          className="form-control"
        />
        {errors.nombre && (
          <p className="invalid-feedback">Este campo es requerido</p>
        )}
      </div>

      <div className="col-md-6">
        <label htmlFor="color" className="form-label">
          Color
        </label>
        <input
          {...register("color", { required: true })}
          id="color"
          type="text"
          className="form-control"
        />
        {errors.color && (
          <p className="invalid-feedback">Este campo es requerido</p>
        )}
      </div>

      <div className="col-md-6">
        <label htmlFor="puntos" className="form-label">
          Puntos
        </label>
        <input
          {...register("puntos", { valueAsNumber: true })}
          id="puntos"
          type="number"
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="copas" className="form-label">
          Copas
        </label>
        <input
          {...register("copas", { valueAsNumber: true })}
          id="copas"
          type="number"
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="campañas" className="form-label">
          Campañas
        </label>
        <input
          {...register("campañas", { valueAsNumber: true })}
          id="campañas"
          type="number"
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ranking" className="form-label">
          Ranking
        </label>
        <input
          {...register("ranking", { valueAsNumber: true })}
          id="ranking"
          type="number"
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="partidas" className="form-label">
          Partidas
        </label>
        <input
          {...register("partidas", { valueAsNumber: true })}
          id="partidas"
          type="number"
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="colonias" className="form-label">
          Colonias
        </label>
        <input
          {...register("colonias", { valueAsNumber: true })}
          id="colonias"
          type="number"
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="victorias" className="form-label">
          Victorias
        </label>
        <input
          {...register("victorias", { valueAsNumber: true })}
          id="victorias"
          type="number"
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="victoriasEspeciales" className="form-label">
          Victorias Especiales
        </label>
        <input
          {...register("victoriasEspeciales", { valueAsNumber: true })}
          id="victoriasEspeciales"
          type="number"
          className="form-control"
        />
      </div>

      <div className="col-md-6">
        <label htmlFor="ataqueSolitario" className="form-label">
          Ataque Solitario
        </label>
        <input
          {...register("ataqueSolitario", { valueAsNumber: true })}
          id="ataqueSolitario"
          type="number"
          className="form-control"
        />
      </div>
           <div className="col-md-6">
        <label htmlFor="defensaSolitario" className="form-label">
          Defensa Solitario
        </label>
        <input
          {...register("defensaSolitario", { valueAsNumber: true })}
          id="defensaSolitario"
          type="number"
          className="form-control"
        />
      </div>
      <div className="col-md-12">
        <label htmlFor="cumpleaños" className="form-label">
          Fecha de nacimiento
        </label>
        <input
          {...register("cumpleaños")}
          id="cumpleaños"
          type="date"
          className="form-control"
        />
      </div>
      <div className="col-md-12">
        <label htmlFor="biografia" className="form-label">
          Biografia
        </label>
        <textarea
          {...register("biografia")}
          id="biografia"
          type="textarea"
          className="form-control"
          rows="6"
        />
      </div>
     
      <div className="col-12">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
};
