import { Avatar, Box, Button, Card, Checkbox, FormControlLabel, Grid, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import type { InfoType } from '../types/InfoType';

const infos: InfoType[] = [
  {
    date: '10.12.2022',
    priority: 'Высокая',
    equipment: 'Вегас',
    message: 'Сервер Vegas недоступен',
    responsible: 'Смирнов В.А.'
  },
  {
    date: '10.12.2022',
    priority: 'Низкая',
    equipment: 'Коммутатор',
    message: 'Потеряно сетевое соединение',
    responsible: 'Капустин С.С.'
  },
  {
    date: '10.12.2022',
    priority: 'Низкая',
    equipment: 'Люк',
    message: 'Открыта крышка',
    responsible: 'Ветрова И.С.'
  },
  {
    date: '10.12.2022',
    priority: 'Высокая',
    equipment: 'ИБП',
    message: 'Низкий заряд батареи',
    responsible: 'Лавочкин А.В.'
  },
  {
    date: '10.12.2022',
    priority: 'Критическая',
    equipment: 'Трансформатор',
    message: 'Недостаточное количество масла',
    responsible: 'Ольшанская Е.Г.'
  },
  {
    date: '10.12.2022',
    priority: 'Критическая',
    equipment: 'ЛВС',
    message: 'Обрыв силового кабеля',
    responsible: 'Ветрова И.С.'
  },
  {
    date: '10.12.2022',
    priority: 'Высокая',
    equipment: '',
    message: 'Отсутствует подтверждение пуска в работу',
    responsible: 'Смирнов В.А.'
  }
];

export default function InfoCard(): JSX.Element {
  const [selected, setSelected] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "card">("table");
  const [isSearchTermChanged, setIsSearchTermChanged] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const cardsPerPage = 6;
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (index: number): void => {
    setSelectedRows((prevSelectedRows: number[]) => {
      const isSelected: boolean = prevSelectedRows.includes(index);
      if (isSelected) {
        return prevSelectedRows.filter((rowIndex: number) => rowIndex !== index);
      }
      return [...prevSelectedRows, index] as number[];
    });
  };

  const handleSearchTermChange = (event: any): void => {
    if (isSearchTermChanged) {
      setSearchTerm('');
      setIsSearchTermChanged(false);
    } else {
      setSearchTerm(event.target.value);
    }
  };

  const handleToggle = (index: number): void => {
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const handleViewModeChange = (mode: "table" | "card"): void => {
    setViewMode(mode);
  };

  const filteredInfos = infos.filter((info) =>
    Object.values(info).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const displayCards = filteredInfos.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number): void => {
    setCurrentPage(value);
  };

  return (

    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '80px' }}>
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <Button disabled={viewMode === "table"} onClick={() => handleViewModeChange("table")} variant="outlined" style={{ border: '1px solid black', background: viewMode === "table" ? 'lightblue' : 'white', color: 'black' }}>
          Таблица
        </Button>
        <Button disabled={viewMode === "card"} onClick={() => handleViewModeChange("card")} variant="outlined" style={{ border: '1px solid black', background: viewMode === "card" ? 'lightblue' : 'white', color: 'black' }}>
          Карточки
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          label="Поиск"
          value={searchTerm}
          onChange={handleSearchTermChange}
          size="small"
          style={{ border: '1px solid black' }}
        />

      </Box>
      {viewMode === "table" ? (
        <>
          <TableContainer style={{ border: '1px solid black' }}>
            <Table>
              <TableHead style={{ background: 'lightgrey' }}>
                <TableRow>
                  <TableCell style={{ borderRight: "1px solid #ccc" }}>Дата</TableCell>
                  <TableCell style={{ borderRight: "1px solid #ccc" }}>Важность</TableCell>
                  <TableCell style={{ borderRight: "1px solid #ccc" }}>Оборудование</TableCell>
                  <TableCell style={{ borderRight: "1px solid #ccc" }}>Сообщение</TableCell>
                  <TableCell>Ответственный</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayCards.map((info, index) => (
                  <TableRow
                    key={index}
                    onClick={() => handleRowClick(index)}
                    style={{
                      borderRight: "1px solid #ccc",
                      background: selectedRows.includes(index) ? "lightblue" : "white"
                    }}
                  >
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>{info.date}</TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>{info.priority}</TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>{info.equipment}</TableCell>
                    <TableCell style={{ borderRight: "1px solid #ccc" }}>{info.message}</TableCell>
                    <TableCell>{info.responsible}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(filteredInfos.length / cardsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <>
          <Grid container spacing={2}>
            {displayCards.map((info, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    marginBottom: 5,
                    marginLeft: 5,
                    marginRight: 5,
                    position: 'relative',
                    border: '1px solid black',
                    backgroundColor: selected.includes(index) ? 'lightblue' : 'white'

                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '18px', marginLeft: '10px', marginTop: '10px', marginBottom: 2 }}>
                      {`Дата: ${info.date}`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: -4, marginBottom: -4, marginLeft: -1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selected.includes(index)}
                            onChange={() => handleToggle(index)}
                          />
                        }
                        label="Важность"
                        labelPlacement="start"
                      />
                      <Typography sx={{ fontWeight: 'bold', marginLeft: 1, marginTop: 0 }}>
                        {info.priority}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '10px' }}>
                      <Avatar sx={{ width: 80, height: 80 }}>
                        {info.responsible.charAt(0)}
                      </Avatar>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '20px', marginLeft: '10px', marginTop: 0 }}>
                        {info.responsible}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '18px', marginLeft: '10px', marginTop: 2 }}>
                    {`Оборудование: ${info.equipment}`}
                  </Typography>
                  <Typography sx={{ fontWeight: 'bold', fontSize: '18px', marginLeft: '10px', marginTop: 2 }}>
                    Сообщение: {info.message}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={Math.ceil(filteredInfos.length / cardsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </>
      )}
    </Box>
  );
}
