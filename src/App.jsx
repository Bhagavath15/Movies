import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { TicTacToe } from './TicTacToe';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useFormik } from "formik";
import * as yup from "yup";

export default function App() {
  const [movieList, setMovieList] = useState([])

  const navigate = useNavigate()

  const [mode, setMode] = useState("dark")

  const darkTheme = createTheme({
    palette: {
      mode: mode
    }
  })

  const bgStyle = {
    borderRadius: "0px",
    minHeight: "100vh"
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={bgStyle} elevation={4}>
        <div className="App">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <Button onClick={() => navigate("/")} color="inherit">Home</Button>
                <Button onClick={() => navigate("/movies")} color="inherit">Movie</Button>
                <Button onClick={() => navigate("/addcolor")} color="inherit">Add color</Button>
                <Button onClick={() => navigate("/tictactoe")} color="inherit">TicTacToe</Button>
                <Button onClick={() => navigate("/addmovie")} color="inherit">Add Movie</Button>
                <Button
                  sx={{ marginLeft: "auto" }}
                  onClick={() => setMode(mode === "light" ? "dark" : "light")}
                  color="inherit"
                  startIcon={
                    mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}>
                  {mode === "light" ? "dark" : "light"} Mode</Button>
              </Toolbar>
            </AppBar>
          </Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList movieList={movieList} setMovieList={setMovieList} />} />
            <Route path="/movies/:id" element={<MovieDetails movieList={movieList} />} />
            <Route path="/addcolor" element={<AddColor />} />
            <Route path="/addmovie" element={<AddMovie />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/basic-form" element={<BasicForm />} />
          </Routes>


        </div>
      </Paper>
    </ThemeProvider>

  )
}

function MovieDetails({ movieList }) {
  const { id } = useParams()
  // const movie = movieList[id]
  const [movie, setMovie] = useState([])
  useEffect(() => {
    fetch(`https://63d75fc85c4274b136f307c8.mockapi.io/movies/${id}`)
      .then((data) => data.json())
      .then((mvs) => setMovie(mvs))
  }, [id])
  const navigate = useNavigate()

  return (
    <div>
      <iframe
        width="100%"
        height="650"
        src={movie.trailer}
        title="Marvel"
        frameborder="0"
        allow="accelerometer; autoplay;clipboard-white"
        allowfullscreen
      ></iframe>
      <div className="movie-detail-container">
        <h1>Movie Details of {movie.name}</h1>
      </div>
      <Button variant="contained" startIcon={<KeyboardBackspaceIcon />} onClick={() => navigate(-1)}>Back</Button>

    </div>
  )
}
function Home() {
  return (
    <div>
      <h2>Welcome to movie page</h2>
    </div>
  )
}
function NotFound() {
  return (
    <div>
      <img src="https://cdn.dribbble.com/users/1200451/screenshots/7193311/media/ab84f78895fd3792800645cac8cd216c.gif" alt="not found" />
    </div>

  )
}
const formValidationSchema = yup.object({
  name: yup.string().name().required(),
  poster: yup.string().url().required().min(4),
  rating: yup.number().min(0).max(10).required(),
  summary: yup.string().min(20).required(),
  trailer: yup.string().url().min(4).required()

})
function AddMovie() {
  return (
    <div className="add-movie">
      <TextField
        onChange={(event) => setPoster(event.target.value)}
        variant="outlined" label="Movie Poster" />
      <TextField
        onChange={(event) => setName(event.target.value)}
        variant="outlined" label="Movie Name" />
      <TextField
        onChange={(event) => setRating(event.target.value)}
        variant="outlined" label="Movie Rating" />
      <TextField
        onChange={(event) => setSummary(event.target.value)}
        variant="outlined" label="Movie Summary" />
      <TextField
        onChange={(event) => setTrailer(event.target.value)}
        variant="outlined" label="Movie Trailer" />
      <Button variant="contained" onClick={() => {
        const newMovie = {
          poster: poster,
          name: name,
          rating: rating,
          summary: summary,
          trailer: trailer
        }
        setMovieList = ([...movieList, newMovie])
      }}>Add Movie</Button>
    </div>
  )
}

function MovieList({ movieList, setMovieList }) {
  useEffect(() => {
    fetch("https://63d75fc85c4274b136f307c8.mockapi.io/movies")
      .then((data) => data.json())
      .then((mvs) => setMovieList(mvs))
  }, [])


  const [name, setName] = useState("")
  const [poster, setPoster] = useState("")
  const [rating, setRating] = useState("")
  const [summary, setSummary] = useState("")
  const [trailer, setTrailer] = useState("")
  // const addMovie = () => {
  //   const newMovie = {
  //     poster: poster,
  //     name: name,
  //     rating: rating,
  //     summary: summary,
  //     trailer: trailer
  //   }
  //   fetch("https://63d75fc85c4274b136f307c8.mockapi.io/movies"), {
  //     method: "POST",
  //     body: JSON.stringify(newMovie),
  //     heaaders: {
  //       "Content-Type": "application/json",
  //     }
  //   }
  // }

  return (
    <div>

      <div className="movie-list">
        {movieList.map((mv, id) => <Movie key={mv.id} movie={mv} id={mv.id} />)}
      </div>
    </div>

  )
}
function Movie({ movie, id }) {
  const styles = {
    color: movie.rating > 8.5 ? "green" : "crimson"
  }

  const [show, setShow] = useState(true)
  const navigate = useNavigate()
  return (
    <Card>

      <div className="movie-container">

        <img className="movie-poster" src={movie.poster} alt={movie.name} />
        <CardContent>
          <div>
            <div className="movie-data">
              <CardActions>
                <p className="movie-name"><h2>{movie.name}
                  <IconButton color="primary"
                    onClick={() => setShow(!show)}
                    arial-label="Toggle-summary">
                    {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                  <IconButton color="primary" fontSize="small"
                    onClick={() => navigate(`/movies/${id}`)}
                    arial-label="movie-details">
                    <InfoIcon />
                  </IconButton></h2></p>
                <p style={styles} className="movie-rating">⭐{movie.rating}</p>
              </CardActions>
            </div>
            {show ? <p className="movie-summary">{movie.summary}</p> : null}
          </div>
          <CardActions><Btn /></CardActions>
        </CardContent>
      </div >

    </Card >
  )
}

function Btn({ movieList, setMovieList, id }) {
  const [like, setLike] = useState(0)
  const [disLike, setDisLike] = useState(0)
  const getMovies = () => {
    fetch(":https://63d75fc85c4274b136f307c8.mockapi.io/movies", {
      method: "GET"
    })
  }
  useEffect(() => getMovies(), [])

  const deleteMovie = (id) => {
    console.log("deleting...")
    fetch(`https://63d75fc85c4274b136f307c8.mockapi.io/movies/${id}`, {
      method: "DELETE"
    }).then(() => getMovies())
  }
  return (
    <div>
      <IconButton onClick={() => setLike(like + 1)} color="primry">
        <Badge badgeContent={like} color="primary">
          👍</Badge>
      </IconButton>
      <IconButton onClick={() => setDisLike(disLike + 1)} color="primry">
        <Badge badgeContent={disLike} color="error">
          👎</Badge>
      </IconButton>
      <IconButton >
        <ModeEditIcon />
      </IconButton>
      <IconButton onClick={deleteMovie} >
        <DeleteIcon color="error" />
      </IconButton>


    </div>

  )

}


function AddColor() {
  const [color, setColor] = useState("pink")
  const styles = {
    backgroundColor: color
  }
  const [colorList, setColorList] = useState(["crimson", "blue"])

  return (
    <div>
      <input style={styles} type="text"
        onChange={(event) => setColor(event.target.value)}
        value={color}
      />
      <button onClick={() => setColorList([...colorList, color])}>Add color</button>
      {colorList.map((clr) => <ColorBox color={clr} />)}
    </div >


  )
}
function ColorBox({ color }) {
  const styles = {
    width: "250px",
    height: "25px",
    margin: " 5px 0px",
    background: color
  }
  return (
    <div style={styles}></div>
  )
}