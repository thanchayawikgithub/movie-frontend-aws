import type Movie from "./movie";

export default interface Showtime {
  showId: number;

  showStart: Date;

  showDate: Date;

  showEnd: Date;

  creatDate: Date;

  deleteDate: Date;

  updateDate: Date;


  movie: Movie;

  // @OneToMany(() => Ticket, (ticket) => ticket.showtime)
  // tickets: Ticket[];

  // @ManyToOne(() => Theater, (theater) => theater.showtimes)
  // @JoinColumn({ name: 'theaterId' })
  // theater: Theater;

  // @OneToMany(() => ShowtimeSeat, (showtimeseats) => showtimeseats.showtime)
  // showtimeseats: ShowtimeSeat[];
}
