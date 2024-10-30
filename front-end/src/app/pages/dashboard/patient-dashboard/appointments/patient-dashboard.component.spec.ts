import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PatientDashboardComponent } from './patient-dashboard.component';
import { CommonModule } from '@angular/common';

describe('PatientDashboardComponent', () => {
  let component: PatientDashboardComponent;
  let fixture: ComponentFixture<PatientDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        PatientDashboardComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate upcoming appointments correctly', () => {
    expect(component.upcomingAppointments.length).toBeGreaterThanOrEqual(0);
    expect(component.upcomingAppointments.every(a => a.status === 'pending')).toBeTruthy();
  });

  it('should calculate completed appointments correctly', () => {
    expect(component.completedAppointments.length).toBeGreaterThanOrEqual(0);
    expect(component.completedAppointments.every(a => a.status === 'completed')).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    const initialState = component.sidebarOpen;
    component.toggleSidebar();
    expect(component.sidebarOpen).toBe(!initialState);
  });

  it('should format current date correctly', () => {
    const date = component.getCurrentDate();
    expect(date).toBeTruthy();
    expect(typeof date).toBe('string');
  });

  it('should cancel appointment correctly', () => {
    const testAppointmentId = '1';
    component.cancelAppointment(testAppointmentId);
    const cancelledAppointment = component.appointments.find(a => a.id === testAppointmentId);
    expect(cancelledAppointment?.status).toBe('cancelled');
  });
});
